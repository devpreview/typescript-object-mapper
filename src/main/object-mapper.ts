import { Type } from "./type";

export class ObjectMapper {

    public static deserialize<T>(type: Type<T>, json: string): T {
        return null;
    }

    public static deserializeArray<T>(type: Type<T>, json: string): T[] {
        return [];
    }

    public static serialize<T>(obj: T): string;
    public static serialize<T>(obj: T, asString: boolean = true): any {
        return '';
    }

}
