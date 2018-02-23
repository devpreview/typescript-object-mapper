import { ObjectMapper } from "../main/object-mapper";

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
