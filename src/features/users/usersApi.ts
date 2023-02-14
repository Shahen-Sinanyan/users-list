import { TUsersList } from "../../types";

export function fetchUsers() {
  return new Promise<TUsersList>((resolve) =>
    setTimeout(
      () => resolve(JSON.parse(localStorage.getItem("usersList")!)),
      700
    )
  );
}
