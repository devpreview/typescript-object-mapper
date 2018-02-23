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
    public static serialize<T, J>(obj: T, jtype: Type<J>): J;
    public static serialize<T, J>(obj: T[], jtype: Type<J>): J[];
    public static serialize<T, J>(obj: T | T[], jtype?: Type<J>): string | J | J[] {
        if (jtype !== undefined) {
            if (obj instanceof Array) {
                return this.getInstance().serialize<T, J>(obj, jtype);
            } else {
                return this.getInstance().serialize<T, J>(obj, jtype);
            }
        } else {
            return this.getInstance().serialize<T>(obj);
        }
    }

    public static deserialize<T>(type: Type<T>, json: string): T;
    public static deserialize<T, J>(type: Type<T>, json: J): T;
    public static deserialize<T, J>(type: Type<T>, json: string | J): T {
        if (typeof json == 'string') {
            return this.getInstance().deserialize<T>(type, json);
        } else {
            return this.getInstance().deserialize<T, J>(type, json);
        }
    }

    public static deserializeArray<T>(type: Type<T>, json: string): T[];
    public static deserializeArray<T, J>(type: Type<T>, json: J[]): T[];
    public static deserializeArray<T, J>(type: Type<T>, json: string | J[]): T[] {
        if (typeof json == 'string') {
            return this.getInstance().deserializeArray<T>(type, json);
        } else {
            return this.getInstance().deserializeArray<T, J>(type, json);
        }
    }

    public constructor() {
    }

    public serialize<T>(obj: T | T[]): string;
    public serialize<T, J>(obj: T, jtype: Type<J>): J;
    public serialize<T, J>(obj: T[], jtype: Type<J>): J[];
    public serialize<T, J>(obj: T | T[], jtype?: Type<J>): string | J | J[] {
        if (obj instanceof Array) {
            if (jtype !== undefined) {
                return obj.map(obj => this.serializeObject<T, J>(obj, jtype));
            } else {
                return JSON.stringify(obj.map(obj => this.serializeObject<T, Object>(obj, Object)));
            }
        } else {
            if (jtype !== undefined) {
                return this.serializeObject<T, J>(obj, jtype);
            } else {
                return JSON.stringify(this.serializeObject<T, Object>(obj, Object));
            }
        }
    }

    public deserialize<T>(type: Type<T>, json: string): T;
    public deserialize<T, J>(type: Type<T>, json: J): T;
    public deserialize<T, J>(type: Type<T>, json: string | J): T {
        if (typeof json == 'string') {
            return this.deserializeObject<T, Object>(type, JSON.parse(json));
        } else {
            return this.deserializeObject<T, J>(type, json);
        }
    }

    public deserializeArray<T>(type: Type<T>, json: string): T[];
    public deserializeArray<T, J>(type: Type<T>, json: J[]): T[];
    public deserializeArray<T, J>(type: Type<T>, json: string | J[]): T[] {
        if (typeof json == 'string') {
            return JSON.parse(json).map((json: Object) => this.deserializeObject<T, Object>(type, json));
        } else {
            return json.map((json) => this.deserializeObject<T, J>(type, json));
        }
    }

    protected serializeObject<T, J>(obj: T, jtype: Type<J>): J {
        return new jtype();
    }

    protected deserializeObject<T, J>(type: Type<T>, json: J): T {
        return new type();
    }

}
