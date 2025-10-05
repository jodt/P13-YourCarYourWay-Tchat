package com.yourcaryourway.back.service;

import com.yourcaryourway.back.dto.UserDto;
import com.yourcaryourway.back.model.User;
import com.yourcaryourway.back.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User addUser(UserDto user) {

        Optional<User> existingUser = isUserAlreadyRegistered(user);
        if (existingUser.isPresent()) {
            return existingUser.get();
        } else {
            User newUser = User.builder().username(user.getUsername()).build();
            return this.userRepository.save(newUser);
        }
    }

    private Optional<User> isUserAlreadyRegistered(UserDto userDto) {
        return this.userRepository.findByUsername(userDto.getUsername());
    }
}
