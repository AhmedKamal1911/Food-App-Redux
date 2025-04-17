import { useState, useEffect } from "react";
import clsx from "clsx";

import { passwordRules } from "@/lib/data";

type Props = {
  password: string;
};

export default function PasswordIndicator({ password }: Props) {
  const [strength, setStrength] = useState(0);

  console.log({ password });
  useEffect(() => {
    const updatedRules = passwordRules.map(({ name, rule }) => ({
      name,
      rule,
      isPassed: rule.test(password),
    }));

    const score = updatedRules.reduce(
      (acc, curr) => acc + (curr.isPassed ? 1 : 0),
      0
    );
    setStrength(score);
  }, [password]);

  console.log({ strength });

  return (
    <div>
      <div className="w-full h-1 bg-gray-300 rounded-sm overflow-hidden">
        <div
          className={clsx(
            {
              "bg-red-500": strength <= 2,
              "bg-amber-500": strength >= 3,
              "bg-green-500": strength === 5,
            },
            "h-full transition-all duration-500 rounded-sm"
          )}
          style={{
            width: `${(strength / passwordRules.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
