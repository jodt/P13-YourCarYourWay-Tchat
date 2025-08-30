package com.yourcaryourway.back.service;

import com.yourcaryourway.back.dto.UserDto;
import com.yourcaryourway.back.exception.UserAlreadyExistException;
import com.yourcaryourway.back.model.User;
import com.yourcaryourway.back.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User addUser(UserDto user) throws UserAlreadyExistException {
        checkIfUserExist(user);
        User newUser = User.builder().username(user.getUsername()).build();
        return this.userRepository.save(newUser);
    }

    private void checkIfUserExist(UserDto userDto) throws UserAlreadyExistException {
        if (this.userRepository.findByUsername(userDto.getUsername()).isPresent()) {
            throw new UserAlreadyExistException();
        }
    }
}
