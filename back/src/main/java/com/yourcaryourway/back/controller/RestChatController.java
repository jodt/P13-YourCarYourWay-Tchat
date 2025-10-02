package com.yourcaryourway.back.controller;

import com.yourcaryourway.back.dto.ChatMessageDto;
import com.yourcaryourway.back.mapper.ChatMessageMapper;
import com.yourcaryourway.back.model.ChatMessage;
import com.yourcaryourway.back.service.ChatMessageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/chat")
public class RestChatController {

    private final ChatMessageService chatMessageService;

    public RestChatController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;
    }

    @GetMapping("/all/room/{room}")
    List<ChatMessageDto> getMessagesByRoom(@PathVariable String room) {
        List<ChatMessage> historicalMessages = this.chatMessageService.getMessagesByRoom(room);
        return historicalMessages.stream().map(ChatMessageMapper::toChatMessageDto).toList();
    }
}
