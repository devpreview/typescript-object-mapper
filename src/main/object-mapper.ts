import { Type } from "./type";

export class ObjectMapper {

    private static Instance: ObjectMapper;

    protected static getInstance(): ObjectMapper {
        if (!this.Instance) {
            this.Instance = new ObjectMapper();
        }
        return this.Instance;
    }

    public static serialize<T>(obj: T | T[]): string;
    public static serialize<T, J>(obj: T, type: Type<J>): J;
    public static serialize<T, J>(obj: T[], type: Type<J>): J[];
    public static serialize<T, J>(obj: T | T[], type?: Type<J>): string | J | J[] {
        if (type !== undefined) {
            if (obj instanceof Array) {
                return this.getInstance().serialize<T, J>(obj, type);
            } else {
                return this.getInstance().serialize<T, J>(obj, type);
            }
        } else {
            return this.getInstance().serialize<T>(obj);
        }
    }

    public static deserialize<T>(type: Type<T>, json: string): T;
    public static deserialize<T, J>(type: Type<T>, json: J): T;
    public static deserialize<T>(type: Type<T>, json: any): T {
        return this.getInstance().deserialize<T>(type, json);
    }

    public static deserializeArray<T>(type: Type<T>, json: string): T[];
    public static deserializeArray<T, J>(type: Type<T>, json: J[]): T[];
    public static deserializeArray<T>(type: Type<T>, json: any): T[] {
        return this.getInstance().deserializeArray<T>(type, json);
    }

    public constructor() {
    }

    public serialize<T>(obj: T | T[]): string;
    public serialize<T, J>(obj: T, type: Type<J>): J;
    public serialize<T, J>(obj: T[], type: Type<J>): J[];
    public serialize<T, J>(obj: T | T[], type?: Type<J>): string | J | J[] {
        if (obj instanceof Array) {
            if (type !== undefined) {
                return [new type()];
            } else {
                return JSON.stringify([{test: 'ok'}]);
            }
        } else {
            if (type !== undefined) {
                return new type();
            } else {
                return JSON.stringify({test: 'ok'});
            }
        }
    }

    public deserialize<T>(type: Type<T>, json: string): T;
    public deserialize<T, J>(type: Type<T>, json: J): T;
    public deserialize<T>(type: Type<T>, json: any): T {
        return new type();
    }

    public deserializeArray<T>(type: Type<T>, json: string): T[];
    public deserializeArray<T, J>(type: Type<T>, json: J[]): T[];
    public deserializeArray<T>(type: Type<T>, json: any): T[] {
        return [new type(), new type()];
    }

}
