#!/usr/bin/env python

from datetime import datetime
import os
import sys
import subprocess


SITE_DIR = os.path.dirname(os.path.abspath(__file__))


def main(title):
    today = datetime.now().strftime('%Y-%m-%d')
    title = title.replace(' ', '-')
    assert len(title.split()) == 1, "Make sure to double quote the title!"

    filename = '{0}-{1}.txt'.format(today, title)
    abs_filename = os.path.join(SITE_DIR, 'notes', filename)

    with open(abs_filename, 'w') as f:
        f.write("Something notable happened:\n")

    print 'Made {0}'.format(abs_filename)
    subprocess.call('emacs -nw {0}'.format(abs_filename), shell=True)


if __name__ == '__main__':
    main(title=sys.argv[1])
