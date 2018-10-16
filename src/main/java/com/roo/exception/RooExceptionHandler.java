package com.roo.exception;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.roo.result.CodeMsg;
import com.roo.result.Result;
import com.roo.util.LocalConstants;

@ControllerAdvice
public class RooExceptionHandler {
	
	private static final transient Logger logger = Logger.getLogger(RooExceptionHandler.class);
	
	@ExceptionHandler(value=Exception.class)
	public Result<String> exceptionHandler(HttpServletRequest request, Exception e){

		if(e instanceof RooFontServiceException) {
			RooFontServiceException ex = (RooFontServiceException)e;
			logger.info("前端异常:"+"异常编码:【"+ex.getExceptionCode()+"】异常信息【"+ex.getMessage()+"】.");
			return Result.error(new CodeMsg(ex.getExceptionCode(),LocalConstants.getSysErrorValue(ex.getExceptionCode())));
		}else {
			return Result.error(CodeMsg.FONT_ERROR);
		}
	}
}
