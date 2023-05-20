package com.controller;

import com.entities.User;
import com.service.UserService;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class UserController
{

	@Autowired
	 private UserService userservice;
	 
	
	@PostMapping
	public User registerUser(@RequestBody User user)
	{
		return userservice.registerUser(user);
	}

	@GetMapping("/{id}")
	public User getUser(@PathVariable("id") int id)
	{
		return userservice.getUserById(id);
	}
	
	@PostMapping("/loginuser")
	public ResponseEntity loginUser(@RequestBody User user) throws AuthenticationException {
		User foundUser = userservice.loginUser(user);
		if(foundUser!=null)
			return new ResponseEntity<>(foundUser, HttpStatus.OK);
		return new ResponseEntity<>("Wrong Username and Password", HttpStatus.FORBIDDEN);
	}
	
	@PutMapping
	public ResponseEntity updateUser(@RequestBody User user)
	{
		return new ResponseEntity<>(userservice.updateUser(user), HttpStatus.OK);
	}

	@DeleteMapping("/deleteuser/{u_id}")
	public Boolean deleteUser(@PathVariable int u_id)
	{
		boolean value=userservice.deleteUser(u_id);
		if(value==true)
			return true;
		else
			return false;
	}//Ok
	
	@GetMapping("/getuser/{u_id}")
	public User singleUser(@PathVariable int u_id)
	{
		return userservice.singleUser(u_id);
	}//Ok
	
	@GetMapping("/getalluser")
	public List<User> allUser()
	{
		return userservice.allUser();
	}//Ok
	
	 
}
