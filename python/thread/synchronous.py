import time

import requests

SYMBOLS = ("USD", "EUR", "PLN", "NOK", "CZK")
BASES = ("USD", "EUR", "PLN", "NOK", "CZK")


def fetch_rates(base):
    response = requests.get(f"https://api.vatcomply.com/rates?base={base}")
    response.raise_for_status()
    rates = response.json()["rates"]

    # 노트: 동일 화폐는 1:1로 환전한다
    rates[base] = 1.0

    rates_line = ", ".join([f"{rates[symbol]:7.03} {symbol}" for symbol in SYMBOLS])
    print(f"1 {base} = {rates_line}")


def main():
    for base in BASES:
        fetch_rates(base)


if __name__ == "__main__":
    started = time.time()
    main()
    elapsed = time.time() - started

    print()
    print("time elapsed: {:.2f}s".format(elapsed))
