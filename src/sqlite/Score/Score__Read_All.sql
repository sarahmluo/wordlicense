select 
  ScoreId
  ,Initials
  ,Score
  ,Total
  ,ScoreDate
  ,(Score/Total) as RelativeScore
from
  Score
order by
  RelativeScore desc
