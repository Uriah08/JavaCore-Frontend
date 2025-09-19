import React, { useState } from "react";

import AddDialog from "../../admin/dialogs/machine-list-dialogs/AddDialog";
import ConfirmationDialog from "../../admin/dialogs/machine-list-dialogs/ConfimationDialog";
import SingleDeleteConfirmationDialog from "../../admin/dialogs/machine-list-dialogs/SingleDeletionConfirmationDialog";
import UpdatingDialog from "../../admin/dialogs/machine-list-dialogs/UpdatingDialog";

// API hooks
import {
  useGetAreasQuery,
  useSoftDeleteAreaMutation,
} from "@/store/machine-list/area-api";
import {
  useLazyGetEquipmentGroupQuery,
  useSoftDeleteEquipmentGroupMutation,
} from "@/store/machine-list/equipment-group-api";
import {
  useLazyGetEquipmentNameQuery,
  useSoftDeleteEquipmentNameMutation,
} from "@/store/machine-list/equipment-name-api";
import {
  useLazyGetComponentQuery,
  useSoftDeleteComponentMutation,
} from "@/store/machine-list/component-api";
import { useGetSessionQuery } from "@/store/auth-api";

//types
import type { Area, EquipmentGroup, EquipmentName } from "@/lib/types";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Plus, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const List: React.FC = () => {
  // States
  const [currentArea, setCurrentArea] = useState<Area | null>(null);
  const [currentEquipmentGroup, setCurrentEquipmentGroup] =
    useState<EquipmentGroup | null>(null);
  const [currentEquipmentName, setCurrentEquipmentName] =
    useState<EquipmentName | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isSingleDeleteConfirmDialogOpen, setSingleDeleteConfirmDialogOpen] =
    useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [itemToDeleteName, setItemToDeleteName] = useState<string | null>(null);
  const [updateDialogTitle, setUpdateDialogTitle] = useState("");
  const [isUpdatingDialogOpen, setIsUpdatingDialogOpen] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState("");

  // API Queries to fetch data
  const { data: session } = useGetSessionQuery();
  const {
    data: areaData,
    isLoading: areaLoading,
    error: areaError,
  } = useGetAreasQuery();

  const [
    fetchEquipmentGroups,
    {
      data: equipmentGroupData,
      error: groupError,
      isFetching: equipmentGroupLoading,
    },
  ] = useLazyGetEquipmentGroupQuery();

  const [
    fetchEquipmentNames,
    {
      data: equipmentNameData,
      error: nameError,
      isFetching: equipmentNamesLoading,
    },
  ] = useLazyGetEquipmentNameQuery();

  const [
    fetchComponents,
    {
      data: componentData,
      error: componentError,
      isFetching: componentsLoading,
    },
  ] = useLazyGetComponentQuery();

  // API Mutations for soft delete
  const [deleteArea] = useSoftDeleteAreaMutation();
  const [deleteEquipmentGroup] = useSoftDeleteEquipmentGroupMutation();
  const [deleteEquipmentName] = useSoftDeleteEquipmentNameMutation();
  const [deleteComponent] = useSoftDeleteComponentMutation();

  if (!session) return <div>Please log in.</div>;

  //loading state
  const loading =
    areaLoading ||
    equipmentGroupLoading ||
    equipmentNamesLoading ||
    componentsLoading;

  if (areaError || groupError || nameError || componentError) {
    return <div className="text-red-600">Error loading data.</div>;
  }

  // Handle area click
  const handleAreaClick = async (area: Area) => {
    setCurrentArea(area);
    setCurrentEquipmentGroup(null);
    setCurrentEquipmentName(null);
    setBreadcrumb([area.name]);
    await fetchEquipmentGroups(area.id);
  };

  // Handle equipment group click
  const handleEquipmentGroupClick = async (equipmentGroup: EquipmentGroup) => {
    setCurrentEquipmentGroup(equipmentGroup);
    setCurrentEquipmentName(null);
    setBreadcrumb([breadcrumb[0], equipmentGroup.name]);
    await fetchEquipmentNames(equipmentGroup.id);
  };

  // Handle equipment name click
  const handleEquipmentNameClick = async (equipmentName: EquipmentName) => {
    setCurrentEquipmentName(equipmentName);
    setBreadcrumb([breadcrumb[0], breadcrumb[1], equipmentName.name]);
    await fetchComponents(equipmentName.id);
  };

  // Handle breadcrumb click
  const handleBreadcrumbClick = (level: number) => {
    if (level === 0) {
      setCurrentArea(null);
      setCurrentEquipmentGroup(null);
      setCurrentEquipmentName(null);
      setBreadcrumb([]);
    } else if (level === 1) {
      setCurrentEquipmentGroup(null);
      setCurrentEquipmentName(null);
      setBreadcrumb([breadcrumb[0]]);
    } else if (level === 2) {
      setCurrentEquipmentName(null);
      setBreadcrumb([breadcrumb[0], breadcrumb[1]]);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;

    try {
      if (currentEquipmentName) {
        await deleteComponent(selectedItems).unwrap();
      } else if (currentEquipmentGroup) {
        await deleteEquipmentName(selectedItems).unwrap();
      } else if (currentArea) {
        await deleteEquipmentGroup(selectedItems).unwrap();
      } else {
        await deleteArea(selectedItems).unwrap();
      }

      setSelectedItems([]);
      setIsDeleting(false);
      setIsConfirmDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete items:", error);
    }
  };

  const handleDeleteItem = async (id: string, name: string) => {
    try {
      if (currentEquipmentName) {
        await deleteComponent([id]).unwrap();
      } else if (currentEquipmentGroup) {
        await deleteEquipmentName([id]).unwrap();
      } else if (currentArea) {
        await deleteEquipmentGroup([id]).unwrap();
      } else {
        await deleteArea([id]).unwrap();
      }

      setItemToDeleteName(name);
      setIsDeleting(false);
      setSingleDeleteConfirmDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleOpenDialog = (title: string) => {
    setDialogTitle(title);
    setIsDialogOpen(true);
  };

  const handleUpdatingOpenDialog = (title: string, id: string) => {
    setUpdateDialogTitle(title);
    setUpdatingItemId(id);
    setIsUpdatingDialogOpen(true);
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  type Item = Area | EquipmentGroup | EquipmentName;

  // UI render list
  const renderList = (items: Item[], level: number) => (
    <ul>
      <div className="flex md:flex-row flex-col justify-between md:items-center my-9">
        <h1 className="text-lg items-center md:text-center text-gray-800 font-semibold">
          {level === 0
            ? "Select an area"
            : level === 1
            ? "Select a group"
            : level === 2
            ? "Select an equipment"
            : "Components"}
        </h1>
        <div
          className={`flex space-x-2 ${
            session?.user.role !== "admin" && "hidden"
          }`}
        >
          <Button
            onClick={() =>
              handleOpenDialog(
                `Add New ${
                  level === 0
                    ? "Area"
                    : level === 1
                    ? "Group"
                    : level === 2
                    ? "Name"
                    : "Component"
                }`
              )
            }
            className="bg-main hover:bg-follow md:mt-0 mt-5"
            disabled={loading}
          >
            Add <Plus />
          </Button>
          {isDeleting && selectedItems.length > 0 && (
            <Button
              disabled={loading}
              onClick={() => setIsConfirmDialogOpen(true)}
              className="bg-main hover:bg-follow md:mt-0 mt-5"
            >
              Delete Selected
            </Button>
          )}
          <Button
            onClick={() => {
              setIsDeleting((prev) => !prev);
              setSelectedItems([]);
            }}
            className="text-main hover:text-main md:mt-0 mt-5"
            variant={"outline"}
            disabled={loading}
          >
            {isDeleting ? (
              <>Cancel</>
            ) : (
              <>
                Delete <Trash className="ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>

      {loading ? (
        <div>
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              className="w-full h-[53px] border-t animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      ) : (
        <>
          {items.length === 0 ? (
            <div className="flex flex-col items-center my-20">
              <p className="text-gray-300 text-3xl font-bold">
                No items available.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <li
                key={item.id}
                className={`p-2 border-t flex justify-between items-center hover:bg-slate-100 cursor-pointer ${
                  selectedItems.includes(item.id) ? "bg-slate-100" : ""
                }`}
                onClick={() => {
                  if (isDeleting) {
                    handleSelectItem(item.id);
                  } else {
                    if (level === 0) {
                      handleAreaClick(item as Area);
                    } else if (level === 1) {
                      handleEquipmentGroupClick(item as EquipmentGroup);
                    } else if (level === 2) {
                      handleEquipmentNameClick(item as EquipmentName);
                    }
                  }
                }}
              >
                <div className="flex gap-2 items-center">
                  {isDeleting && (
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectItem(item.id);
                      }}
                    />
                  )}
                  <span>{item.name}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <EllipsisVertical
                      className={`text-zinc-500 z-20 ${
                        session?.user.role !== "admin" && "hidden"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        setUpdatingItemId(item.id);
                        handleUpdatingOpenDialog(
                          `Update ${
                            level === 0
                              ? "Area Name"
                              : level === 1
                              ? "Group Name"
                              : level === 2
                              ? "Equipment Name"
                              : "Component Name"
                          }`,
                          item.id
                        );
                        setIsUpdatingDialogOpen(true);
                      }}
                    >
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        setItemToDelete(item.id);
                        setItemToDeleteName(item.name);
                        setSingleDeleteConfirmDialogOpen(true);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ))
          )}
        </>
      )}
    </ul>
  );

  return (
    <div className="mt-5">
      {/* Breadcrumb */}
      <div className="font-base flex">
        <span
          className={`cursor-pointer mr-1 ${
            breadcrumb.length === 0
              ? "font-semibold text-gray-800"
              : "text-gray-600 hover:underline"
          }`}
          onClick={() => handleBreadcrumbClick(0)}
        >
          Machines
        </span>
        {breadcrumb.map((item, i) => (
          <React.Fragment key={i}>
            <span className="mx-2 text-sm text-gray-600"> &gt; </span>
            <span
              className={`cursor-pointer ${
                i === breadcrumb.length - 1
                  ? "font-semibold text-gray-800"
                  : "text-gray-600 hover:underline"
              }`}
              onClick={() => handleBreadcrumbClick(i + 1)}
            >
              {item}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Lists */}

      <div className="space-y-2">
        {!currentArea && renderList(areaData?.areas || [], 0)}
        {currentArea &&
          !currentEquipmentGroup &&
          renderList(equipmentGroupData?.equipmentGroups || [], 1)}
        {currentEquipmentGroup &&
          !currentEquipmentName &&
          renderList(equipmentNameData?.equipmentNames || [], 2)}
        {currentEquipmentName && renderList(componentData?.components || [], 3)}
      </div>

      {/* Dialogs */}
      <AddDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={dialogTitle}
      />
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleDeleteSelected}
        title="Confirm Deletion"
        message={`Are you sure you want to delete ${selectedItems.length} item(s)?`}
      />
      <SingleDeleteConfirmationDialog
        isOpen={isSingleDeleteConfirmDialogOpen}
        onClose={() => setSingleDeleteConfirmDialogOpen(false)}
        onConfirm={async () => {
          if (itemToDelete && itemToDeleteName) {
            await handleDeleteItem(itemToDelete, itemToDeleteName);
          }
        }}
        title="Confirm Deletion"
        message={`Are you sure you want to delete ${itemToDeleteName}?`}
      />
      <UpdatingDialog
        isOpen={isUpdatingDialogOpen}
        onClose={() => setIsUpdatingDialogOpen(false)}
        title={updateDialogTitle}
        id={updatingItemId}
      />
    </div>
  );
};

export default List;
