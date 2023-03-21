from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in law_sys/__init__.py
from law_sys import __version__ as version

setup(
	name="law_sys",
	version=version,
	description="Law Module ",
	author="mvp",
	author_email="jiku1213@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
