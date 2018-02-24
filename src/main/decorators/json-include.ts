/**
 * Annotation used to indicate when value of the annotated property
 * (when used for a field, method or constructor parameter), or all properties of the annotated class, is to be serialized.
 * Without annotation property values are always included, but by using this annotation
 * one can specify simple exclusion rules to reduce amount of properties to write out.
 *
 * @see: https://fasterxml.github.io/jackson-annotations/javadoc/2.9/com/fasterxml/jackson/annotation/JsonInclude.html
 */
