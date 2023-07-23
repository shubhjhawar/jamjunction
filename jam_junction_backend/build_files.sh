echo "BUILD START"
python manage.py collectstatic --noinput --clear
echo "BUILD END"