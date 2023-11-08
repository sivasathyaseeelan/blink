import React from "react"

import { Card, Divider, Typography, Box } from "@mui/joy"

import RevokeKey from "./revoke"

interface ApiKey {
  id: string
  name: string
  createdAt: string
  expiresAt: string
  lastUsedAt?: string | null
  expired: boolean
  revoked: boolean
}

const formatDate = (timestamp: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }
  return new Date(parseInt(timestamp) * 1000).toLocaleDateString(undefined, options)
}

interface ApiKeysCardProps {
  activeKeys: ApiKey[]
  expiredKeys: ApiKey[]
  revokedKeys: ApiKey[]
}

const ApiKeysCard: React.FC<ApiKeysCardProps> = ({
  activeKeys,
  expiredKeys,
  revokedKeys,
}: ApiKeysCardProps) => {
  const renderKeyCards = (keyArray: ApiKey[], title: string) => (
    <>
      <Typography fontSize={22}>{title}</Typography>
      {keyArray.length === 0 ? (
        <Typography>No keys to display.</Typography>
      ) : (
        keyArray.map((key: ApiKey) => (
          <Card key={key.id} sx={{ width: "100%", mb: 2 }}>
            <Typography fontSize={14}>{key.id}</Typography>
            <Typography fontSize={18} fontWeight={"bolder"}>
              {key.name}
            </Typography>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontSize={13}>Created At</Typography>
              <Typography fontSize={13}>{formatDate(key.createdAt)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontSize={13}>Expires At</Typography>
              <Typography fontSize={13}>{formatDate(key.expiresAt)}</Typography>
            </Box>
            {!key.revoked && !key.expired && <RevokeKey id={key.id} />}
          </Card>
        ))
      )}
      <Divider />
    </>
  )

  return (
    <>
      {renderKeyCards(activeKeys, "Active Keys")}
      {renderKeyCards(revokedKeys, "Revoked Keys")}
      {renderKeyCards(expiredKeys, "Expired Keys")}
    </>
  )
}

export default ApiKeysCard
