Expected results, step by step:
- Initialize git in root dir
- Do a code review. Fix not only the application errors, but also the structure/codestyle (by changes in code or comments - depends on you)
- Make commit(s)


Общие рекомендации:
- следовать единому стиля в разметке jsx избегать мешанины div'ов компонентов
- максимально дробить логически разные компоненты, во избежании мешанины и компонентов по 1000 строк в итоге
- избавится от инлайн стилей
- css нейминги должны быть единообразны в одном стиле
- избавится от any, иначе проще тогда писать на чистом javascript
- выносить функции из обработчиков onClick/onChange для повышения читаемости
