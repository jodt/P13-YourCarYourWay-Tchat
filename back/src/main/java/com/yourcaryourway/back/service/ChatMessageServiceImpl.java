package com.yourcaryourway.back.service;

import com.yourcaryourway.back.model.ChatMessage;
import com.yourcaryourway.back.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;

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
}
