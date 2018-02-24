/**
 * Marker annotation that can be used to define a non-static method as a "setter" or "getter"
 * for a logical property (depending on its signature), or non-static object field to be used (serialized, deserialized) as a logical property.
 *
 * @see: https://fasterxml.github.io/jackson-annotations/javadoc/2.9/com/fasterxml/jackson/annotation/JsonProperty.html
 */
import { AccessType } from "../access-type";
import { Type } from "../type";

/**
 * Type of the JsonProperty metadata.
 */
export interface JsonPropertyMetadata {
    /**
     * Name of the JSON property to map
     */
    name?: string,

    /**
     * Is this field required in the JSON object that is being deserialized
     */
    required?: boolean,

    /**
     * Is this serializable and de-serializable
     */
    access?: AccessType,

    /**
     * The type of Object that should be assigned to this property
     */
    type?: Type<any>
}

/**
 * JsonProperty decorator and metadata.
 */
export function JsonProperty(metadata?: JsonPropertyMetadata | string) {
    return (target: any, propertyKey: string) => {
        console.log(target, propertyKey);
        console.log(Reflect.ownKeys(target));
    }
}
