package com.roo.result;

public class CodeMsg {
	private int code;
	private String msg;
	
	//定义前端错误
	public static CodeMsg FONT_ERROR = new CodeMsg(201, "前端异常");
	public static CodeMsg FONT_PARAM_IN_ERROR = new CodeMsg(202, "前端入参异常");

	public CodeMsg(int code, String msg) {
		this.code = code;
		this.msg = msg;
	}
	
	public int getCode() {
		return code;
	}
	public String getMsg() {
		return msg;
	}
}
