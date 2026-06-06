# We want to find a formula: Level = f(EXP)
# where:
# f(260957584) = 3230
# f(203656736) = 2853
# f(280893984) = 3351
# f(368738368) = 3840
# f(325676576) = 3609
# f(625077888) = 5000
# f(283577888) = 3367

# Let's test standard formulas where EXP is a function of Level:
# Often: EXP = A * L^2 + B * L + C
# Let's write a solver to find A, B, C that satisfies as many as possible,
# or we can test different coefficients:
# Usually A = 25, B is some integer.
# If A = 25:
# L = 3230 -> 25 * 3230^2 = 260822500. Remainder = 260957584 - 260822500 = 135084.
# L = 2853 -> 25 * 2853^2 = 203492225. Remainder = 203656736 - 203492225 = 164511.
# L = 3351 -> 25 * 3351^2 = 280725025. Remainder = 280893984 - 280725025 = 168959.
# L = 3840 -> 25 * 3840^2 = 368640000. Remainder = 368738368 - 368640000 = 98368.
# L = 3609 -> 25 * 3609^2 = 325622025. Remainder = 325676576 - 325622025 = 54551.
# L = 5000 -> 25 * 5000^2 = 625000000. Remainder = 625077888 - 625000000 = 77888.
# L = 3367 -> 25 * 3367^2 = 283417225. Remainder = 283577888 - 283417225 = 160663.

# Wait, is the formula Level = Math.floor(Math.sqrt(EXP / 25))?
# Let's test that:
# L(260957584) = floor(sqrt(10438303.36)) = floor(3230.83) = 3230.  (Correct!)
# L(203656736) = floor(sqrt(8146269.44)) = floor(2854.16) = 2854.   (Expected 2853)
# L(280893984) = floor(sqrt(11235759.36)) = floor(3351.97) = 3351.  (Correct!)
# L(368738368) = floor(sqrt(14749534.72)) = floor(3840.51) = 3840.  (Correct!)
# L(325676576) = floor(sqrt(13027063.04)) = floor(3609.30) = 3609.  (Correct!)
# L(625077888) = floor(sqrt(25003115.52)) = floor(5000.31) = 5000.  (Correct!)
# L(283577888) = floor(sqrt(11343115.52)) = floor(3367.95) = 3367.  (Correct!)

# Wait! Out of 7 cases, 6 are perfectly correct with floor(sqrt(EXP / 25))!
# Why did L(203656736) give 2854 instead of 2853?
# Could it be because of the upgrade level or other stats added to EXP?
# Or is it possible that Level = Math.floor(Math.sqrt(EXP / 25.01))?
# Let's check divisors close to 25:
for div in [25.0, 25.01, 25.02, 25.03, 25.04, 25.05]:
    print(f"\nDivisor = {div}:")
    all_ok = True
    for exp, expected in [
        (260957584, 3230),
        (203656736, 2853),
        (280893984, 3351),
        (368738368, 3840),
        (325676576, 3609),
        (625077888, 5000),
        (283577888, 3367)
    ]:
        val = int((exp / div) ** 0.5)
        if val == expected:
            print(f"  EXP {exp} -> {val} (OK)")
        else:
            print(f"  EXP {exp} -> {val} (FAIL, expected {expected})")
            all_ok = False
    if all_ok:
        print(f"--> Divisor {div} works perfectly for ALL cases!")
