import { JsonProperty } from "../../main/decorators/json-property";

describe('Testing JsonProperty decorator', () => {
    class TestClass {

        public test: string = '123';

        @JsonProperty({})
        public foo: string = 'bar';

        public constructor() {
            this.test = 'ok';
        }

        public static test1() {
            //
        }

    }

    //let t = new TestClass();
    //console.log(t);
});
