import time, threading, random as r, sys

def task(lb, ub, refreshTime):
    while True:
        num = r.randint(lb, ub)
        print(num)
        sys.stdout.write(f'{num}\n')  # Output random number to be captured by Node.js
        sys.stdout.flush()  # Ensure it gets sent immediately
        time.sleep(refreshTime)

if __name__ == "__main__":
    t1 = threading.Thread(target=task, args=(10, 20, 10))
    t2 = threading.Thread(target=task, args=(-10, 10, 20))
    t3 = threading.Thread(target=task, args=(-100, 0, 8))
    t4 = threading.Thread(target=task, args=(0, 20, 12))
    t5 = threading.Thread(target=task, args=(-40, 40, 16))
    t6 = threading.Thread(target=task, args=(100, 200, 14))
    
    t1.start()
    t2.start()
    t3.start()
    t4.start()
    t5.start()
    t6.start()
    
    t1.join()
    t2.join()
    t3.join()
    t4.join()
    t5.join()
    t6.join()
