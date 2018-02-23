import { ObjectMapper } from "../main/object-mapper";

describe('Testing ObjectMapper instantiation', () => {

    class TestClass {
        public foo: string = 'bar';
    }

    it('Testing object methods', () => {
        let object = new TestClass();
        let objectMapper = new ObjectMapper();

        expect(typeof(objectMapper.serialize(object))).toEqual('string');
        expect(typeof(objectMapper.serialize([object]))).toEqual('string');
        expect(typeof(objectMapper.serialize(object, true))).toEqual('string');
        expect(typeof(objectMapper.serialize([object], true))).toEqual('string');
        expect(typeof(objectMapper.serialize(object, false))).toEqual('object');
        expect(typeof(objectMapper.serialize([object], false))).toEqual('object');

        expect(objectMapper.deserialize(TestClass, '{}') instanceof TestClass).toBeTruthy();
        expect(objectMapper.deserialize(TestClass, {}) instanceof TestClass).toBeTruthy();

        expect(objectMapper.deserializeArray(TestClass, '[{}]') instanceof Array).toBeTruthy();
        expect(objectMapper.deserializeArray(TestClass, [{}]) instanceof Array).toBeTruthy();
    });

    it('Testing static methods', () => {
        let object = new TestClass();

        expect(typeof(ObjectMapper.serialize(object))).toEqual('string');
        expect(typeof(ObjectMapper.serialize([object]))).toEqual('string');
        expect(typeof(ObjectMapper.serialize(object, true))).toEqual('string');
        expect(typeof(ObjectMapper.serialize([object], true))).toEqual('string');
        expect(typeof(ObjectMapper.serialize(object, false))).toEqual('object');
        expect(typeof(ObjectMapper.serialize([object], false))).toEqual('object');

        expect(ObjectMapper.deserialize(TestClass, '{}') instanceof TestClass).toBeTruthy();
        expect(ObjectMapper.deserialize(TestClass, {}) instanceof TestClass).toBeTruthy();

        expect(ObjectMapper.deserializeArray(TestClass, '[{}]') instanceof Array).toBeTruthy();
        expect(ObjectMapper.deserializeArray(TestClass, [{}]) instanceof Array).toBeTruthy();
    });

});
