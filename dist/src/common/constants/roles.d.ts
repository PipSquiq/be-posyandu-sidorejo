export declare const RolesConst: {
    readonly ADMIN: "ADMIN";
    readonly KADER: "KADER";
};
export type AppRole = (typeof RolesConst)[keyof typeof RolesConst];
