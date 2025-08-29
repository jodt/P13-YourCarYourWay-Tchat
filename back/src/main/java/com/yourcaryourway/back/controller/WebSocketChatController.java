package com.yourcaryourway.back.controller;

import com.yourcaryourway.back.dto.ChatMessageDto;
import com.yourcaryourway.back.mapper.ChatMessageMapper;
import com.yourcaryourway.back.model.ChatMessage;
import com.yourcaryourway.back.service.ChatMessageService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
public class WebSocketChatController {
    private final ChatMessageService chatMessageService;

    public WebSocketChatController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;
    }

    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/{roomId}")
    public ChatMessageDto sendMessage (@DestinationVariable Long roomId, ChatMessageDto chatMessageDto) {
        ChatMessage chatMessage = ChatMessageMapper.toChatMessage(chatMessageDto);
        chatMessage.setRoomId(roomId);
        chatMessageService.save(chatMessage);
        return ChatMessageMapper.toChatMessageDto(chatMessage);
    }

}
