package com.yourcaryourway.back.controller;

import com.yourcaryourway.back.dto.ChatMessageDto;
import com.yourcaryourway.back.mapper.ChatMessageMapper;
import com.yourcaryourway.back.model.ChatMessage;
import com.yourcaryourway.back.service.ChatMessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;


@Slf4j
@Controller
public class WebSocketChatController {
    private final ChatMessageService chatMessageService;

    public WebSocketChatController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;
    }

    @MessageMapping("/chat/{room}")
    @SendTo("/topic/{room}")
    public ChatMessageDto sendMessage (@DestinationVariable String room, ChatMessageDto chatMessageDto) {
        ChatMessage chatMessage = ChatMessageMapper.toChatMessage(chatMessageDto);
        chatMessage.setRoom(room);
        chatMessageService.save(chatMessage);
        return ChatMessageMapper.toChatMessageDto(chatMessage);
    }

}
