package com.hoaxify.ws.configuration;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.data.domain.Page;

import java.io.IOException;

//@JsonComponent
/*public class PageSerializer extends JsonSerializer<Page<?>> {
    @Override
    public void serialize(Page<?> value, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeFieldName("content");
        serializerProvider.defaultSerializeValue(value.getContent(), jsonGenerator);
        jsonGenerator.writeObjectField("pageable", value.getPageable());
        jsonGenerator.writeBooleanField("last", value.isLast());
        jsonGenerator.writeNumberField("totalPages", value.getTotalPages());
        jsonGenerator.writeNumberField("totalElement", value.getTotalElements());
        jsonGenerator.writeNumberField("size", value.getSize());
        jsonGenerator.writeNumberField("number", value.getNumber());
        jsonGenerator.writeObjectField("sort", value.getSort());
        jsonGenerator.writeNumberField("numberOfElements", value.getNumberOfElements());
        jsonGenerator.writeBooleanField("first", value.isFirst());
        jsonGenerator.writeBooleanField("empty", value.isEmpty());
        jsonGenerator.writeEndObject();
    }
}*/
