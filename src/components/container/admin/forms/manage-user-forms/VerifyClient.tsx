import React, { useState } from "react";

const mockClients = [
  { id: 1, name: "Bornok", email: "bornok@example.com", emailVerified: false },
  { id: 2, name: "Joburat", email: "Joburat@example.com", emailVerified: false },
];

const VerifyClient: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<
    { id: number; name?: string; email?: string } | null
  >(null);

  // simulate API loading
  const clientLoading = false;
  const clients = mockClients.filter((client) => !client.emailVerified);

  return (
    <div className="mt-5 gap-3 flex flex-col max-h-[350px] overflow-auto">
      {clientLoading ? (
        <>
          <div className="w-full h-[50px] bg-zinc-200 animate-pulse rounded-md" />
          <div className="w-full h-[50px] bg-zinc-200 animate-pulse rounded-md" />
          <div className="w-full h-[50px] bg-zinc-200 animate-pulse rounded-md" />
        </>
      ) : clients.length !== 0 ? (
        clients.map((client) => {
          const sanitizedClient = {
            ...client,
            name: client.name ?? undefined,
            email: client.email ?? undefined,
          };

          return (
            <div
              key={client.id}
              className="flex justify-between items-center rounded-md p-3 border"
            >
              <div className="flex flex-col">
                <h1 className="text-base font-medium">{sanitizedClient.name}</h1>
                <h1 className="text-sm text-zinc-600">
                  {sanitizedClient.email}
                </h1>
              </div>

              {/* Static verify button */}
              <button
                className="bg-main hover:bg-follow text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setSelectedClient(sanitizedClient);
                  setOpen(true);
                }}
              >
                Verify
              </button>
            </div>
          );
        })
      ) : (
        <h1 className="font-bold text-xl text-zinc-300 text-center w-full my-5">
          All Clients Are Verified
        </h1>
      )}

      {/* Static verify dialog */}
      {open && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-md w-[400px]">
            <h2 className="text-lg font-bold mb-3">
              Verify {selectedClient.name}
            </h2>
            <p className="text-sm text-zinc-600 mb-5">
              Are you sure you want to verify this client with email{" "}
              <strong>{selectedClient.email}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-main hover:bg-follow text-white rounded-md"
                onClick={() => {
                  console.log("Verified client:", selectedClient);
                  setOpen(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyClient;
