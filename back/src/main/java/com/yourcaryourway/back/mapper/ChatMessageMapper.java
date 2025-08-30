package com.yourcaryourway.back.mapper;

import com.yourcaryourway.back.dto.ChatMessageDto;
import com.yourcaryourway.back.model.ChatMessage;

import java.time.LocalDateTime;

public class ChatMessageMapper {

    public static ChatMessageDto toChatMessageDto(ChatMessage chatMessage) {
        return ChatMessageDto.builder()
                .sender(chatMessage.getSender())
                .content(chatMessage.getContent())
                .build();
    }

    public static ChatMessage toChatMessage(ChatMessageDto chatMessageDto) {
        return ChatMessage.builder()
                .sender(chatMessageDto.getSender())
                .content(chatMessageDto.getContent())
                .timestamp(LocalDateTime.now())
                .build();
    }

}
