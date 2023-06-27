package net.sourceforge.olympos.oaw.extend;

import java.util.HashMap;

public class Counter {
	private static HashMap<String, Integer> counters = new HashMap<String, Integer>();

	public static int incrementCounter(String counterId) {
		int counterValue = getValue(counterId);

		counterValue++;

		counters.put(counterId, counterValue);

		return counterValue;
	}

	public static int getValue(String counterId) {
		int result = 0;

		if (counters.containsKey(counterId)) {
			result = counters.get(counterId);
		} else {
			counters.put(counterId, 0);
		}

		return result;
	}
	
	public static int getValueMinusOne(String counterId)
	{
	int result = 0;

	if (counters.containsKey(counterId)) {
		result = counters.get(counterId)-1;
	} else {
		counters.put(counterId, 0);
	}

	return result;
}
}
