package com.yourcaryourway.back.controller;
import com.yourcaryourway.back.dto.UserDto;
import com.yourcaryourway.back.exception.UserAlreadyExistException;
import com.yourcaryourway.back.model.User;
import com.yourcaryourway.back.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/register")
    public UserDto register(@RequestBody UserDto userDto) throws UserAlreadyExistException {
       User user =  this.userService.addUser(userDto);
       return UserDto.builder().id(user.getId()).username(user.getUsername()).build();
    }
}
