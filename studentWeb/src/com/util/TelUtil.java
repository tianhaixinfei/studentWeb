package com.util;

import java.math.BigInteger;
import java.util.regex.Pattern;

public class TelUtil {

	/**
	 * 按照当前手机号码范围130 0000 0000到189 9999 9999经分析，丢失的高位字节可能是0x03或者0x04。
	 * 因此加上0x03或者0x04恢复后的值（Long长整型）符合手机号码范围/格式，就可以得到原始值了。
	 * 有可能出现加0x03和0x04都符合手机号码范围/格式的情况，取加0x04的结果（没法子的事情）
	 * 
	 * @param original 溢出前的原始11位手机号码
	 * @return 转int之后，再重新恢复得到的11位手机号码
	 */
	public static long recover(long original) {
	    Pattern p = Pattern.compile("1[3,4,5,8]\\d{9}");
	    // 更精确的手机号段，但可能不是最新的，这里先不使用。参考： http://wenku.baidu.com/view/9d088df30242a8956bece435.html
	    // Pattern.compile("(133|153|180|181|189|134|135|136|137|138|139|150|151|152|157|158|159|182|183|187|188|130|131|132|155|156|185|186|145|147)\\d{8}");
	    int errorInt = (int) original;
	    System.out.println("溢出前的long值:" + original);
	    System.out.println("溢出后的int值:" + errorInt);
	    System.out.println("溢出前的16进制值:" + Long.toHexString(original));

	    String hexA = "000000000000" + Long.toHexString(errorInt);
	    hexA = hexA.substring(hexA.length() - 8);
	    System.out.println("溢出后的16进制值（左补0）:" + Long.toHexString(errorInt));

	    String hex1 = "4" + hexA;

	    System.out.println("补全后的16进制值1：" + hex1);
	    BigInteger bi1 = new BigInteger(hex1, 16);
	    long rt1 = bi1.longValue();
	    System.out.println("补全后的Long值:" + rt1);

	    String hex2 = "3" + hexA;
	    System.out.println("补全后的16进制值2：" + hex2);
	    BigInteger bi2 = new BigInteger(hex2, 16);
	    long rt2 = bi2.longValue();
	    System.out.println("补全后的Long值2:" + rt2);

	    final boolean m1 = p.matcher(String.valueOf(rt1)).matches();
	    final boolean m2 = p.matcher(String.valueOf(rt2)).matches();

	    long rt = 0;
	    if (m1 && m2) {
	        // 加3加4都符合手机号码格式
	        System.err.println("加3加4都符合手机号码格式的溢出后int值:" + errorInt + ". 2个可能的恢复值为： " + rt1 + ", " + rt2);

	        //有可能出现加0x03和0x04都符合手机号码范围/格式的情况，取加0x04的结果（没法子的事情）
	        rt = rt1;
	    } else {
	        if (m1) {
	            rt = rt1;
	        }
	        if (m2) {
	            rt = rt2;
	        }
	    }
	    System.out.println("恢复后的符合手机号码格式的值:" + rt + "\n\n");
	    return rt;
	}
	
	public static void main(String[] ss){
		System.out.println(recover(2147483647));
	}
	
}
