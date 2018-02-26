import { Type } from "./type";
import { ObjectMapperError } from "./object-mapper-error";

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
            let _json: any;
            try {
                _json = JSON.parse(json);
            } catch (e) {
                if (e instanceof SyntaxError) {
                    throw new ObjectMapperError('JSON syntax error: ' + e.message, e);
                } else {
                    throw new ObjectMapperError('Unknown error', e);
                }
            }
            return this.deserializeObject<T, Object>(type, _json);
        } else {
            return this.deserializeObject<T, J>(type, json);
        }
    }

    public deserializeArray<T>(type: Type<T>, json: string): T[];
    public deserializeArray<T, J>(type: Type<T>, json: J[]): T[];
    public deserializeArray<T, J>(type: Type<T>, json: string | J[]): T[] {
        if (typeof json == 'string') {
            let _json: any;
            try {
                _json = JSON.parse(json);
            } catch (e) {
                if (e instanceof SyntaxError) {
                    throw new ObjectMapperError('JSON syntax error: ' + e.message, e);
                } else {
                    throw new ObjectMapperError('Unknown error', e);
                }
            }
            return _json.map((json: Object) => this.deserializeObject<T, Object>(type, json));
        } else {
            return json.map((json) => this.deserializeObject<T, J>(type, json));
        }
    }

    protected serializeObject<T extends Object, J extends Object>(obj: T, jtype: Type<J>): J {
        let json = new jtype();
        for (let key of Reflect.ownKeys(obj)) {
            if (!Reflect.defineProperty(json, key, {
                    configurable: false,
                    enumerable: true,
                    writable: true,
                    value: Reflect.get(obj, key)
                })) {
                throw new ObjectMapperError('Can not define property "' + key.toString() + '" of object ' + obj.constructor.name);
            }
        }
        return json;
    }

    protected deserializeObject<T extends Object, J extends Object>(type: Type<T>, json: J): T {
        let obj = new type();
        for (let key of Reflect.ownKeys(obj)) {
            Reflect.set(obj, key, Reflect.get(json, key));
        }
        return obj;
    }

}
