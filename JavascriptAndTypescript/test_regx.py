mstr = "DJI_20230121150811_0012_W_1_387.jpg"
print(mstr.split("_")[0][:-1])
print(mstr.rsplit("_", 2))

import re
def remove_hoho(test):
    hoho = re.compile('\([^(^)]*?\)')
    m = hoho.search(test)
    print("m",m)
    if m:
        temp = m.group()
        temp = '\\' + m.group()[:-1] +'\\)'
        print("test",test)
        test = re.sub(f'{temp}','',test)
        return remove_hoho(test)
    return test

test = '가나다 라마((바사) (아자차))'
print("result", remove_hoho(test))