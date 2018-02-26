import { ObjectMapper } from "../main/object-mapper";
import { ObjectMapperError } from "../main/object-mapper-error";

describe('Testing ObjectMapper instantiation', () => {

    class ObjectClass {
        public foo: string = 'bar';
    }

    class JsonClass {
        public constructor(
            public readonly foo: string
        ) {
        }
    }

    it('Testing object methods', () => {
        let object = new ObjectClass();
        let objectMapper = new ObjectMapper();

        expect(typeof(objectMapper.serialize<ObjectClass>(object))).toEqual('string');
        expect(typeof(objectMapper.serialize<ObjectClass>([object]))).toEqual('string');
        expect(objectMapper.serialize<ObjectClass, JsonClass>(object, JsonClass) instanceof JsonClass).toBeTruthy();
        expect(objectMapper.serialize<ObjectClass, JsonClass>([object], JsonClass) instanceof Array).toBeTruthy();

        expect(objectMapper.deserialize<ObjectClass>(ObjectClass, '{}') instanceof ObjectClass).toBeTruthy();
        expect(objectMapper.deserialize<ObjectClass, JsonClass>(ObjectClass, new JsonClass('bar')) instanceof ObjectClass).toBeTruthy();

        expect(objectMapper.deserializeArray<ObjectClass>(ObjectClass, '[{}]') instanceof Array).toBeTruthy();
        expect(objectMapper.deserializeArray<ObjectClass, JsonClass>(ObjectClass, [new JsonClass('bar')]) instanceof Array).toBeTruthy();
    });

    it('Testing static methods', () => {
        let object = new ObjectClass();

        expect(typeof(ObjectMapper.serialize<ObjectClass>(object))).toEqual('string');
        expect(typeof(ObjectMapper.serialize<ObjectClass>([object]))).toEqual('string');
        expect(ObjectMapper.serialize<ObjectClass, JsonClass>(object, JsonClass) instanceof JsonClass).toBeTruthy();
        expect(ObjectMapper.serialize<ObjectClass, JsonClass>([object], JsonClass) instanceof Array).toBeTruthy();

        expect(ObjectMapper.deserialize<ObjectClass>(ObjectClass, '{}') instanceof ObjectClass).toBeTruthy();
        expect(ObjectMapper.deserialize<ObjectClass, JsonClass>(ObjectClass, new JsonClass('bar')) instanceof ObjectClass).toBeTruthy();

        expect(ObjectMapper.deserializeArray<ObjectClass>(ObjectClass, '[{}]') instanceof Array).toBeTruthy();
        expect(ObjectMapper.deserializeArray<ObjectClass, JsonClass>(ObjectClass, [new JsonClass('bar')]) instanceof Array).toBeTruthy();
    });

});

describe('Testing errors', () => {

    class ObjectClass {
        public foo: string = 'bar';
    }

    it('Testing JSON errors', () => {
        expect(() => {
            ObjectMapper.deserialize(ObjectClass, '{');
        }).toThrowError(ObjectMapperError);

        expect(() => {
            ObjectMapper.deserializeArray(ObjectClass, '{');
        }).toThrowError(ObjectMapperError);

        let error: ObjectMapperError | undefined;
        try {
            ObjectMapper.deserialize(ObjectClass, '{');
        } catch (e) {
            error = e;
        }
        expect(error instanceof ObjectMapperError).toBeTruthy();
        if (error !== undefined) {
            expect(error.name).toEqual(ObjectMapperError.name);
            expect(error.message).toEqual('JSON syntax error: Unexpected end of JSON input');
            expect(error.stack).toBeDefined();
            expect(error.cause instanceof SyntaxError).toBeTruthy();
        }
    });

});

describe('First tests', () => {

    class SimpleRoster {
        public name: string = 'John Doe';
        public worksOnWeekend: boolean = true;
        public numberOfHours: number = 4;
    }

    it('First serialize test', () => {
        expect(ObjectMapper.serialize(new SimpleRoster())).toEqual('{"name":"John Doe","worksOnWeekend":true,"numberOfHours":4}');
    });

    it('First deserialize test', () => {
        expect(ObjectMapper.deserialize(SimpleRoster, '{"name":"John Doe","worksOnWeekend":true,"numberOfHours":4}')).toEqual(jasmine.objectContaining({
            name: 'John Doe',
            worksOnWeekend: true,
            numberOfHours: 4
        }));
    });

});
