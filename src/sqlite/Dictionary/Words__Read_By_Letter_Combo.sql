SELECT
  *
FROM
 Words
WHERE
  Word like '%' || @letter1 || '%' || @letter2 || '%' || @letter3 || '%'
