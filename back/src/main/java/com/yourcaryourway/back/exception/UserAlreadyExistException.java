package com.yourcaryourway.back.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "USER-ALREADY_EXIST")
public class UserAlreadyExistException extends Exception{

}
