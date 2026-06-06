import numpy as np

# We have three points (Level, EXP):
# P1: Level 3230, EXP 260957584  (Yamcha - Slot 3)
# P2: Level 2853, EXP 203656736  (Android 16 - Slot 20)
# P3: Level 3345, EXP 430877938  (Trunks - Slot 26)

levels = np.array([3230, 2853, 3345], dtype=float)
exps = np.array([260957584, 203656736, 430877938], dtype=float)

# Fit a quadratic equation: EXP = A * L^2 + B * L + C
A, B, C = np.polyfit(levels, exps, 2)
print("Quadratic fit: EXP = {:.4f} * L^2 + {:.4f} * L + {:.4f}".format(A, B, C))

# Let's check if A, B, C are clean integers or close to clean values
# e.g., WC3 default exp formulas often use:
# exp = 100 * level^2 + ...
# or exp = 200 * level^2 ...
# Let's check if the quadratic fit matches all three points perfectly:
for L, E in zip(levels, exps):
    pred = A * L**2 + B * L + C
    print(f"Level {L}: Actual EXP={E}, Pred={pred:.1f}, Diff={E - pred:.4f}")
