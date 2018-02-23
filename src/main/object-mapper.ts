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
    public static serialize<T>(obj: T | T[], asString: boolean): any;
    public static serialize<T>(obj: T | T[], asString: boolean = true): any {
        return this.getInstance().serialize<T>(obj, asString);
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
    public serialize<T>(obj: T | T[], asString: boolean): any;
    public serialize<T>(obj: T | T[], asString: boolean = true): any {
        let result = {test: 'ok'};
        if (asString) {
            return JSON.stringify(result);
        } else {
            return result;
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
