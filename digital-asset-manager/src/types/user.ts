export interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly avatar?: string;
  readonly preferences: {
    readonly currency: string;
    readonly theme: "light" | "dark";
    readonly notifications: boolean;
  };
}
