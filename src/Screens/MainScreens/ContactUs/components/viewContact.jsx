/* eslint-disable react/prop-types */

export default function ViewContact({ target }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="flex flex-col gap-2">
        <p className="text-lg font-semibold">Address</p>
        <p className="text-zinc-400">{target?.address}</p>
      </span>
      <span className="flex flex-col gap-2">
        <p className="text-lg font-semibold">Phone</p>
        <p className="text-zinc-400">{target?.phone}</p>
      </span>
      <span className="flex flex-col gap-2">
        <p className="text-lg font-semibold">Email</p>
        <p className="text-zinc-400">{target?.email}</p>
      </span>
      <span className="flex flex-col gap-2">
        <p className="text-lg font-semibold">Map Link</p>
        <p className="break-all text-zinc-400">{target?.mapLink}</p>
      </span>
    </div>
  );
}
