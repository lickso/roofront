package com.roo.util;

import java.util.HashMap;
import java.util.Map;

/**
 * @des    静态常量
 * @date   2018-10-12
 * @author yangsheng
 *
 */
public final class LocalConstants {
	
	//前端系统异常枚举
	private static final Map<Integer,String>  ROO_SYS_ERROR_MAPPER = new HashMap<Integer,String>();
	static{
		ROO_SYS_ERROR_MAPPER.put(201, "前端异常");
		ROO_SYS_ERROR_MAPPER.put(202, "前端入参异常");
	}
	public static String getSysErrorValue(int code) {
		return ROO_SYS_ERROR_MAPPER.get(code);
	}
	
}
