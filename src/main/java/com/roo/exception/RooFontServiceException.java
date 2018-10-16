package com.roo.exception;

import java.util.Map;

import com.roo.util.LocalConstants;


public class RooFontServiceException extends RooException{
	private static final long serialVersionUID = 1L;

	public RooFontServiceException() {
		this(LocalConstants.getSysErrorValue(201));
		this.exceptionCode = 201;
	}

	public RooFontServiceException(int errCode) {
		this(LocalConstants.getSysErrorValue(errCode));
		this.exceptionCode = errCode;
	}
	
	public RooFontServiceException(int errCode,String msg) {
		super(msg);
		this.exceptionCode = errCode;
	}
	
	public RooFontServiceException(String msg) {
		super(msg);
		this.exceptionCode = 201;
	}

	public RooFontServiceException(Throwable cause) {
		this(LocalConstants.getSysErrorValue(201), cause);
		this.exceptionCode = 201;
	}

	public RooFontServiceException(String msg, Throwable cause) {
		super(msg, cause);
		this.exceptionCode = 201;
	}

	public RooFontServiceException(Map<String, Object> params) {
		this();
		this.exceptionCode = 201;
		this.params = params;
	}

	public RooFontServiceException(String msg, Map<String, Object> params) {
		this(msg);
		this.exceptionCode = 201;
		this.params = params;
	}

	public RooFontServiceException(String msg, Map<String, Object> params, Throwable cause) {
		this(msg, cause);
		this.exceptionCode = 201;
		this.params = params;
	}

	public RooFontServiceException(Map<String, Object> params, Throwable cause) {
		this(cause);
		this.exceptionCode = 201;
		this.params = params;
	}
}
