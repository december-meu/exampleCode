package com.dadi.nyd.test;



import java.util.Set;

import javax.annotation.Resource;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;

import com.dadi.util.BeanUtils;
import com.dadi.util.DozerUtil;
import com.dadi.util.EncryptUtil;

@SuppressWarnings("deprecation")
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations = { "classpath*:spring/test-spring-context.xml" })
@TransactionConfiguration(transactionManager="transactionManager",defaultRollback=true)  
//public class BasicTest{  
public class BasicTest extends AbstractTransactionalJUnit4SpringContextTests{  
	@Before
	public void setUp() throws Exception {
		
	}


	@After
	public void tearDown() throws Exception {
		System.out.println("===test after==");
	}

	@Test
	public void testFindUser(){
	}
}
