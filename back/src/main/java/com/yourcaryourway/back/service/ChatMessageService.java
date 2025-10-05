package com.yourcaryourway.back.service;

import com.yourcaryourway.back.dto.UserDto;
import com.yourcaryourway.back.model.ChatMessage;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ChatMessageService {
    ChatMessage save(ChatMessage chatMessage);
    List<ChatMessage> getMessagesByRoom(String roomId);
}
