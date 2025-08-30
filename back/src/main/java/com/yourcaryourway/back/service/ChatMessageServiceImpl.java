package com.yourcaryourway.back.service;

import com.yourcaryourway.back.model.ChatMessage;
import com.yourcaryourway.back.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;

    public ChatMessageServiceImpl(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    @Override
    public ChatMessage save(ChatMessage chatMessage) {
        return  chatMessageRepository.save(chatMessage);
    }

    @Override
    public List<ChatMessage> getMessagesByRoom(String roomId) {
        return this.chatMessageRepository.findAllByRoomId(roomId);
    }
}
