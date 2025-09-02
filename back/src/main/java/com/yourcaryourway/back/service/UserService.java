package com.yourcaryourway.back.service;

import com.yourcaryourway.back.dto.UserDto;
import com.yourcaryourway.back.model.User;

public interface UserService {
    User addUser(UserDto user);
}
