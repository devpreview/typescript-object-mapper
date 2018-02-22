import { Type } from "./type";

export class ObjectMapper {

    public static deserialize<T>(type: Type<T>, json: string): T;
    public static deserialize<T, J>(type: Type<T>, json: J): T;
    public static deserialize<T>(type: Type<T>, json: any): T {
        return new type();
    }

    public static deserializeArray<T>(type: Type<T>, json: string): T[];
    public static deserializeArray<T, J>(type: Type<T>, json: J): T[];
    public static deserializeArray<T>(type: Type<T>, json: any): T[] {
        return [new type(), new type()];
    }

    public static serialize<T>(obj: T): string;
    public static serialize<T>(obj: T, asString: boolean): any;
    public static serialize<T>(obj: T, asString: boolean = true): any {
        return '';
    }

}
