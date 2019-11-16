export const onSegment = ({p1, p2, p3}) => {
  return (
    p2.x <= Math.max(p1.x, p3.x) && p2.x >= Math.min(p1.x, p3.x) &&
    p2.y <= Math.max(p1.y, p3.y) && p2.y >= Math.min(p1.y, p3.y)
  )
}

export const ORIENTATIONS = Object.freeze({
  colinear: 0,
  clockwise: 1,
  couterclockwise: 2,
})

export const orientation = ({p1, p2, p3}) => {
  const val = (
    (p2.y - p1.y) *
    (p3.x - p2.x) -
    (p2.x - p1.x) *
    (p3.y - p2.y)
  )

  if (val === 0) return ORIENTATIONS.colinear // Colinear
  return val > 0 ? ORIENTATIONS.clockwise : ORIENTATIONS.counterclockwise // Clockwise vs counter clock wise
}

export const lineIntersect = ({line1:[p1,q1], line2:[p2,q2]}) => {
  const o1 = orientation(p1, q1, p2)
  const o2 = orientation(p1, q1, q2)
  const o3 = orientation(p2, q2, p1)
  const o4 = orientation(p2, q2, q1)

  if(o1 !== o2 && o3 !== o4) return true
  // Special Cases
  // p1, q1 and p2 are colinear and p2 lies on segment p1q1
  if (o1 == 0 && onSegment(p1, p2, q1)) return true
  // p1, q1 and q2 are colinear and q2 lies on segment p1q1
  if (o2 == 0 && onSegment(p1, q2, q1)) return true
  // p2, q2 and p1 are colinear and p1 lies on segment p2q2
  if (o3 == 0 && onSegment(p2, p1, q2)) return true
  // p2, q2 and q1 are colinear and q1 lies on segment p2q2
  if (o4 == 0 && onSegment(p2, q1, q2)) return true
  return false
}

export const lineAreaIntersection = ({line, area}) => {
  return area.reduce((acc, next) => acc || lineIntersect({line1: line, line2: next}), false)
}
