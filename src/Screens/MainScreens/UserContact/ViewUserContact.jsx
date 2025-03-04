/* eslint-disable react/prop-types */

export default function ViewUserContact({ target }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="flex flex-col gap-2">
        <p className="text-lg font-semibold">First Name</p>
        <p className="text-zinc-400">{target?.firstName}</p>
      </span>
      <span className="flex flex-col gap-2">
        <p className="text-lg font-semibold">Last Name</p>
        <p className="text-zinc-400">{target?.lastName}</p>
      </span>
      <span className="flex flex-col gap-2">
        <p className="text-lg font-semibold">Email</p>
        <p className="text-zinc-400">{target?.email}</p>
      </span>
      <span className="flex flex-col gap-2">
        <p className="text-lg font-semibold">Message</p>
        <p className="break-all text-zinc-400">{target?.message}</p>
      </span>
    </div>
  );
}
